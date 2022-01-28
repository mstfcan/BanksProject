using BanksDatabase.Models;
using BanksDatabase.Utility;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BanksDatabase.Operations.Banks
{
    public class BanksOperations
    {
        public void InsertData(Bank bank)
        {
            using (var connection = DBConnection.GetSQLiteConnection())
            {
                connection.Open();
                SqliteCommand command = connection.CreateCommand();
                
                SQLHelper.CreateInsertCommand(ref command, "banks",
                new string[] { "name", "address", "description" },
                new object[] { bank.Name, bank.Address, bank.Description });

                command.ExecuteNonQuery();
            }
        }

        public List<Bank> ReadAllData()
        {
            List<Bank> bankList = new List<Bank>();
            using (var connection = DBConnection.GetSQLiteConnection())
            {
                connection.Open();

                var command = connection.CreateCommand();
                SQLHelper.CreateSQLTextForSelectQuery(ref command, "banks", null);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        bankList.Add(new Bank
                        {
                            Id=reader.GetInt32(0),
                            Name = reader.GetString(1),
                            Address = reader.GetString(2),
                            Description = reader.GetString(3)
                        });
                    }
                }
            }
            return bankList;
        }
    }
}
