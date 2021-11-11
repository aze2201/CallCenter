# CallCenter

1.  Django CMS provide WEB Pages (Agent page and web call page)
2.  All web pages connect to Web Socket server (python)
3.  Python Websocket server sends data over JSON format to local Shell script
4.  Shell script get data from Django DB (agent USERS of Support Group) and sends data to Caller.
5.  Callers get PeerJS ID and call to Agents over PeerJS ID.


