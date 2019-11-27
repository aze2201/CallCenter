#!/bin/bash

curr=$(pwd)
database=${curr}/data/data.db
rootFolder=${curr}/data/cache


genToken(){
    echo $(date +%s | sha1sum | base64 | head -c 32 ; echo)
}



findToken_context() {
	context=$1
	result=1
	userlist=$(echo "select username from users where context='${context}';"| sqlite3 ${database})
	for user in ${userlist} ; do
		tokn=$(cat ${rootFolder}/${user}_token)
		getStatus=$(cat ${rootFolder}/${tokn}_status)
		if [ "${getStatus}" == "free" ]; then
			result=0
			break
		fi
	done
	# result 0 means someone has free status, no need to send queue
	echo ${result}
}

