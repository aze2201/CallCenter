import sqlite3
import sys
sql=sys.argv[2]
database=sys.argv[1]


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = str(row[idx]).encode('utf8')
    return d

conn=sqlite3.connect(database,isolation_level=None)
conn.row_factory = dict_factory
result=conn.execute(sql).fetchall()
print  result
