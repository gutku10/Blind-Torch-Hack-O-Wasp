set root = C:\Program Files\MongoDB\Server\4.0\bin
cd /C%root%
chdir /d  C:\Program Files\MongoDB\Server\4.0\bin
REM start mongod
start mongoimport.exe --db blind --collection newtry --type xls --file PLX-DAQ.xls --headerline
REM start mongo 
REM pause
REM mongo.exe --eval "use location;"
mongo.exe location --eval "db.op.find();"
timeout 10
echo "hello"