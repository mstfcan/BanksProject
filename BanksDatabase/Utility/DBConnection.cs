using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BanksDatabase
{
    internal class DBConnection
    {
        private static SqliteConnection sqliteConnection;

        public static SqliteConnection GetSQLiteConnection()
        {
            sqliteConnection = new SqliteConnection("Data Source=banks.db");
            SQLitePCL.Batteries.Init();
            return sqliteConnection;
        }
    }
}
