# BolsaEmpleo
proyecto bolsa de empleo GDAPP

##Dependencias

    flask 
    flask-restplus
    flask-cors
    flask-login
    requests
    pymongo
##Backup & Restore DB
mongodump --archive=test.20150715.archive --db test
mongorestore --archive=test.20150715.archive --db test