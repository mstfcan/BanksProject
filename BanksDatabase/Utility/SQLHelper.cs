using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BanksDatabase.Utility
{
    internal class SQLHelper
    {
        public static void CreateInsertCommand(ref SqliteCommand sqliteCommand, string table, string[] columns, object[] values)
        {
            if (columns.Length != values.Length)
            {
                throw new Exception("Gönderilen değerler veya sütunlar eksik ya da fazla.");
            }
            else if (sqliteCommand == null || table == "" || columns == null || values == null)
            {
                throw new Exception("Parametreler boş geçilemez!");
            }

            sqliteCommand.CommandText = CreateSQLTextForInsertCommand(table, columns);

            for (int i = 0; i < columns.Length; i++)
            {
                sqliteCommand.Parameters.AddWithValue(columns[i], values[i]);
            }
        }

        private static string CreateSQLTextForInsertCommand(string table, string[] columns)
        {
            string insert = string.Empty;
            string values = string.Empty;

            insert = $"INSERT INTO {table}(";
            insert += String.Join(',', columns);
            insert += ")";

            values = " VALUES($";
            values += String.Join(",$", columns);
            values += ")";

            return insert + values;
        }

        public static void CreateSQLTextForSelectQuery(ref SqliteCommand sqliteCommand, string table, string[] columns)
        {
            if (table == "")
                throw new Exception("Tablo adı boş geçilemez!");

            if (columns == null)
                sqliteCommand.CommandText = $"SELECT * FROM {table}";
            else
                sqliteCommand.CommandText = "SELECT " + String.Join(',', columns) + $" FROM {table}";
        }
    }
}
