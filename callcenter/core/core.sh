#!/bin/bash

#{"command\":\"updatePeerID\",\"token\":\"YjA0OTY5YzcyMTI1Yzc1OTljNTcxYjky\",\"peerID\":\"12345qwert\"}
#{"command":"updatePeerID","token":"YjA3NDY1ODRlYTVlYjc3MzExMWI1NDA5","peerID":"12345qrewewt"}
#{"command":"updatePeerID","token":"YjA3NDY1ODRlYTVlYjc3MzExMWI1NDA5","peerID":"12345qwert"}
#{"command":"updatePeerID","token":"YjA3NDY1ODRlYTV","peerID":"12345qwert123"}
#{"command":"updatePeerID","token":"YjA3NDY1ODRlYTV1","peerID":"4545tytyt"}
# {"command":"updatePeerID","token":"YjAddNDY1ODRlYTV1","peerID":"wewew"}


#--------customer calling---------
#./parse.sh "{\"command\":\"startcall\",\"context\":\"azeee\"}"
# {"command":"startcall","context":"azeee","token":"YjA3NDY1ODRlYTV","callerPeerID":"12345qwert123"}
#           {"command":"startcall","context":"azeee","token":"YjA3NDY1ODRlYTV1","callerPeerID":"4545tytyt"}
#                {"command":"startcall","context":"azeee","token":"YjAddNDY1ODRlYTV1","callerPeerID":"wewew"}
#--------member answering---------
#./parse.sh "{\"command\":\"answer\",\"token\":\"OWYwNjVjZGEzMWNmYjlkNTRlZmY4Mjc5\"}"
#{"command":"answer","token":"YjA3NDY1ODRlYTVlYjc3MzExMWI1NDA5","callerPeerID":"12345qwert123"}
#-------end call------------------
#{"command":"endcall","token":"YjA3NDY1ODRlYTVlYjc3MzExMWI1NDA5","remotePeerID":"12345qwert123"}
# ------reject call-----------
#{"command":"reject","token":"YjA3NDY1ODRlYTVlYjc3MzExMWI1NDA5","callerPeerID":"12345qwert123"}


## NOTES:
# if one of member reject call it will send stoprginging and to all member and will send busy call to caller
# need to keep call status. to idetify user is busy or not


jsonMessage=$1
curr=$(pwd)
curr="/root/ws/CallCenter/callcenter/core"
#. ${curr}/scripts/functions.sh
cacheDir=${curr}/cache
logFile=${curr}/log/logParseSH.log

database=/root/callc/mysite/project.db
cdrdb=${curr}/data/cdr.database

command=$(echo "${jsonMessage}"  | jq -r '.command')



# parse 'command' object from json
case $command in
    updatePeerID)
        peerToken=$(echo ${jsonMessage}  | jq -r '.token')
        peerID=$(echo ${jsonMessage}     | jq -r '.peerID')
        socketID1=$(echo ${jsonMessage}  | jq -r '.socketID')
        tokenExist=$(grep ${peerToken} ${cacheDir}/*_token)
        if [ ${#tokenExist} -ne 0 ]; then
            echo "${peerID}|${socketID1}" > ${cacheDir}/${peerToken}_peer
            if [ ${#peerID} -ne 0 ]; then
                echo "{\"status\":\"ok\",\"destinationSocket\":\"${socketID1}\",\"command\":\"updatePeerID\",\"token\":\"${peerToken}\"}"
                echo "|free" > ${cacheDir}/${peerToken}_status
            else
                echo "{\"status\":\"nok\",\"destinationSocket\":\"${socketID1}\",\"command\":\"updatePeerID\",\"description\":\"PeerID is empty\"}"
            fi
        else
                echo "{\"status\":\"nok\",\"destinationSocket\":\"${socketID1}\",\"command\":\"updatePeerID\",\"description\":\"token is wrong\"}"
        fi
        ;;
    updatePeerIDBrowser)
        peerToken=$(echo ${jsonMessage}  | jq -r '.token')
        peerID=$(echo ${jsonMessage}     | jq -r '.peerID')
        socketID1=$(echo ${jsonMessage}  | jq -r '.socketID')
        # if file exist
        echo "${peerID}|${socketID1}" > ${cacheDir}/${peerToken}_peer
        if [ ${#peerID} -ne 0 ]; then
            echo "{\"status\":\"ok\",\"destinationSocket\":\"${socketID1}\",\"command\":\"updatePeerID\",\"token\":\"${peerToken}\"}"
            echo "|calling" > ${cacheDir}/${peerToken}_status
        else
            echo "{\"status\":\"nok\",\"destinationSocket\":\"${socketID1}\",\"command\":\"updatePeerID\",\"description\":\"PeerID is empty\"}"
        fi
        ;;
    startcall)
        # not send current socket which is answered
        # send back no one is online, please call later message
        cntx=$(echo ${jsonMessage}  | jq -r '.context')
        callerToken=$(echo ${jsonMessage}  | jq -r '.token')
        callerPeerID=$(echo ${jsonMessage}  | jq -r '.callerPeerID')
        callerSocketID=$(cat ${cacheDir}/${callerToken}_peer| awk -v FS='|' '{print $2}')
        echo "$callerPeerID|$cntx" > ${cacheDir}/${callerToken}.calling
        userlist=$(echo "select username from auth_user where id in ( select user_id from auth_user_groups where group_id=(select id from auth_group where name='${cntx}'));"| sqlite3 ${database})
        userCount=0
        userNonFree=0
                userlist="agent"
        for user in $userlist; do
            res=$(ls ${cacheDir} | grep ${user})
            if [ -f ${cacheDir}/${user}_token ]; then
                let " userCount = $userCount + 1 "
                tokn=$(cat ${cacheDir}/${user}_token)
                getStatus=$(cat ${cacheDir}/${tokn}_status | awk -v FS='|' '{print $2}')
                customerSocketID=$(cat ${cacheDir}/${tokn}_peer | awk -v FS='|' '{print $2}')
                echo "$callerPeerID|$cntx|||$customerSocketID|$callerSocketID|" > ${cacheDir}/${callerToken}.calling
                if [ "$getStatus" == "free" ] ; then
                    echo "{\"command\":\"startringing\",\"destinationSocket\":\"$customerSocketID\",\"source\":\"$callerSocketID\",\"callerPeerID\":\"$callerPeerID\",\"status\":\"ok\"}"
                    echo "{\"command\":\"getStatus\",\"destinationSocket\":\"$customerSocketID\",\"status\":\"ok\",\"userStatus\":\"calling\"}"
                    echo "$callerPeerID|calling" > ${cacheDir}/${tokn}_status
                else
                    let " userNonFree = $userNonFree + 1 "
                fi
            fi
        done
        if [ "$userNonFree" == "$userCount" ] ; then
            echo "{\"command\":\"busy\",\"destinationSocket\":\"$callerSocketID\",\"status\":\"ok\"}"
        else
            echo "{\"destinationSocket\":\"$callerSocketID\",\"command\":\"startbeeping\"}"
        fi
        echo "$callerPeerID||$callerToken||$callerSocketID|$customerSocketID" > ${cacheDir}/${callerToken}_connected
        ;;
    answer)
        # evvelce yoxla gor bu answer moddadi yoxsa yox.
        callerPeerID=$(echo ${jsonMessage}  | jq -r '.callerPeerID')            # bu setr error vere biler. Eger zeng gelmemish basilsa. HANDLE it.
        tokenCaller=$(grep -l ${callerPeerID} ${cacheDir}/*_peer | awk -v FS='_' '{print $1}'| rev | awk -v FS='/' '{print $1}' | rev)
        tokenAnswer=$(echo ${jsonMessage}  | jq -r '.token')
        # burda evvelce peer fayllarin exist olub olmamasini yoxlamaq lazimmdir, eks halda error vere biler
        callerSource=$(grep ${callerPeerID} ${cacheDir}/*_peer | awk -v FS='|' '{print $2}'| sed 's/\n//' | sed 's/\r//')
        answerPeerID=$(cat ${cacheDir}/${tokenAnswer}_peer | awk -v FS='|' '{print $1}')
        answerSocket=$(cat ${cacheDir}/${tokenCaller}_peer | awk -v FS='|' '{print $2}')
        AnsweredSocket=$(ls ${cacheDir}| grep ${tokenAnswer} | grep peer | xargs -I {} cat ${cacheDir}/{} | awk -v FS='|' '{print $2}')
        # Cavab veren teref
        echo "{\"destinationSocket\":\"${AnsweredSocket}\",\"command\":\"stopringing\",\"status\":\"ok\"}"
        echo "{\"command\":\"getStatus\",\"destinationSocket\":\"${AnsweredSocket}\",\"status\":\"ok\",\"userStatus\":\"busy\"}"
        # Zeng eden teref
        echo "{\"command\":\"getStatus\",\"destinationSocket\":\"$answerSocket\",\"status\":\"ok\",\"userStatus\":\"busy\"}"
        echo " {\"command\":\"stopbeeping\",\"answerPeerID\":\"$answerPeerID\" ,\"destinationSocket\":\"$callerSource\"}"
        # zeng eden ve edilen statuslari INCALL ele
        echo "|incall" > ${tokenCaller}_status
        echo "|incall" > ${tokenAnswer}_status
        echo "$callerPeerID|$answerPeerID|$tokenCaller|$tokenAnswer|$answerSocket|$AnsweredSocket" > ${cacheDir}/${tokenAnswer}_connected
        ;;
    endcall)
        endedToken=$(echo ${jsonMessage}  | jq -r '.token')
        # this is connected file actually
        # endedTokenFile=$(grep -l ${endedToken} ${cacheDir}/${endedToken}.calling | rev | awk -v FS='/' '{print $1}' | rev)
        endedTokenFile="${endedToken}_connected"
        endedSocket=$(cat ${cacheDir}/${endedTokenFile}| awk -v FS='|' '{print $5}'  )
        targetSocket=$(cat ${cacheDir}/${endedTokenFile}| awk -v FS='|' '{print $6}' )
        # Zengi aniden dayandiran teref
        echo "{\"command\":\"endcall\",\"destinationSocket\":\"$endedSocket\",\"status\":\"ok\"}"
        echo "{\"command\":\"getStatus\",\"destinationSocket\":\"$endedSocket\",\"status\":\"ok\",\"userStatus\":\"free\"}"
        # Zengi alan teref
        echo "{\"command\":\"endcall\",\"destinationSocket\":\"$targetSocket\",\"status\":\"ok\"}"
        echo "{\"command\":\"getStatus\",\"destinationSocket\":\"$targetSocket\",\"status\":\"ok\",\"userStatus\":\"free\"}"
        echo "this is SOCKET $targetSocket" >> ${logFile}
        echo "|free" > ${cacheDir}/${endedToken}_status
        echo "|free" > ${cacheDir}/${remoteStatusFile}_status
        # make sure deleting only required file. Not folder.
        if [ -f "${cacheDir}/${endedTokenFile}" ]; then
            rm -rf ${cacheDir}/${endedTokenFile}
        fi
        ;;
    reject)
        callerPeerID=$(echo ${jsonMessage}  | jq -r '.callerPeerID')
        tokenAnswer=$(echo ${jsonMessage}  | jq -r '.token')
        tokenCaller=$(grep -l ${callerPeerID} ${cacheDir}/*_peer | awk -v FS='_' '{print $1}'| rev | awk -v FS='/' '{print $1}' | rev )
        answerUser=$(grep  ${tokenAnswer} ${cacheDir}/*.csrf| awk -v FS='|' '{print $3}')
        callerSource=$(grep ${callerPeerID} ${cacheDir}/*_peer | awk -v FS='|' '{print $2}')
        RejectedSocket=$(ls ${cacheDir}| grep ${tokenAnswer} | grep peer | xargs -I {} cat ${cacheDir}/{} | awk -v FS='|' '{print $2}')
        #userID=$(ls ${cacheDir}| grep ${tokenAnswer} | grep peer | awk -v FS='_' '{print $1}')
        #userID=$(grep -l ${userID} ${cacheDir}/*_token | awk -v FS='_' '{print $1}' | rev | awk -v FS='/' '{print $1}' | rev ) ## user111
        #answerPeerID=$(cat ${cacheDir}/${tokenAnswer}_peer | awk -v FS='|' '{print $1}')
        echo "{\"command\":\"reject\",\"destinationSocket\":\"${callerSource}\",\"status\":\"ok\"}"
        echo "{\"command\":\"reject\",\"destinationSocket\":\"${RejectedSocket}\",\"status\":\"ok\"}"
        #echo "{\"command\":\"undefinedFFF\",\"destinationSocket\":\"${callerSource}\",\"status\":\"ok\"}"
        #userlistUser=$(echo "select username  from auth_user where id in ( select user_id from auth_user_groups where group_id in (select group_id from auth_user_groups where user_id in (select id from auth_user where username='${userID}'))) ;"| sqlite3 ${database})
        #userlistUser=$userID
            #for u in ${userlistUser}; do
                #for tk in $(ls ${cacheDir}  |grep ${u}_token); do
                    #tokenFile=$(cat ${cacheDir}/${tk})
                    #socketID2=$(cat ${cacheDir}/${tokenFile}_peer| awk -v FS='|' '{print $2}')
                    #echo "{\"destinationSocket\":\"${socketID2}\",\"command\":\"reject\",\"status\":\"ok\"}"
                    #echo "{\"command\":\"undefinedFFF\",\"destinationSocket\":\"socketID2\",\"status\":\"ok\"}"
                    #getStatus=$(cat ${cacheDir}/${tokenFile}_status| awk -v FS='|' '{print $2}')
                    #statusFile=$(grep -l ${callerPeerID} ${cacheDir}/*_status | rev | awk -v FS='/' '{print $1}' | rev  )
                    #if [ ${#statusFile} -ne 0 ]; then
                        #for i in $statusFile; do
                          #echo "|free" > $cacheDir/$i
                          #echo "{\"command\":\"getStatus\",\"destinationSocket\":\"$socketID2\",\"status\":\"ok\",\"userStatus\":\"free\"}"
                        #done
                    #fi
                #done
            #done
        echo "|free" > ${cacheDir}/${tokenCaller}_status
        echo "|free" > ${cacheDir}/${tokenAnswer}_status
        ;;
    callRedirect)
        token=$(echo ${jsonMessage}  | jq -r '.token')
        socketID=$(echo ${jsonMessage}  | jq -r '.socketID')
        redirectContext=$(echo ${jsonMessage}  | jq -r '.redirectContext')
        remotePeerID=$(echo ${jsonMessage}  | jq -r '.remotePeerID')
        remoteSocket=$(grep -l ${remotePeerID} ${cacheDir}/*_peer  | rev | awk -v FS='/' '{print $1}' | rev )
        remoteStatusFile=$(echo $remoteSocket| awk -v FS='_peer' '{print $1}')
        remoteSocket=$(cat ${cacheDir}/${remoteSocket} | awk -v FS='|' '{print $2}')
        echo "{\"command\":\"callRedirect\",\"status\":\"ok\",\"redirectContext\":\"$redirectContext\",\"destinationSocket\":\"$remoteSocket\"}"
        ;;
    setStatus)
        token=$(echo ${jsonMessage}  | jq -r '.token')
        socketID=$(echo ${jsonMessage}  | jq -r '.socketID')
        userStatus=$(echo ${jsonMessage}  | jq -r '.userStatus')
        echo "|$userStatus" > ${cacheDir}/${token}_status
        ;;
    getStatus)
        token=$(echo ${jsonMessage}  | jq -r '.token')
        socketID=$(echo ${jsonMessage}  | jq -r '.socketID')
        userStatus=$(cat ${cacheDir}/${token}_status | awk -v FS='|' '{print $2}')
        echo "{\"command\":\"getStatus\",\"destinationSocket\":\"$socketID\",\"status\":\"ok\",\"userStatus\":\"$userStatus\"}"
        ;;
    removeClient)
        # bunu client de gondere biler. ehtiyyatli ol.
        socketID=$(echo ${jsonMessage}  | jq -r '.socketID')
        for i in $(ls ${cacheDir}| grep '_peer'); do
            socket=$(cat ${cacheDir}/${i}| awk -v FS='|' '{print $2}')
            if [ ${#socket} -ne 0 ] && [ "${socket}" == "$socketID" ]; then
                token=$(echo ${i} | awk -v FS='_' '{print $1'})
                #rm -f ${cacheDir}/${token}_*
                #find ${cacheDir} -type f -exec grep -l ${token} {} \; | xargs rm -f
            fi
        done
        ;;
esac
