using BanksDatabase.Models;
using BanksDatabase.Operations.Banks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BanksAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BanksController : ControllerBase
    {
        private readonly ILogger<BanksController> _logger;
        public BanksController(ILogger<BanksController> logger)
        {
            this._logger = logger;
        }

       
        [HttpGet]
        public IEnumerable<Bank> Get()
        {
            try
            {
                BanksOperations banksOperations = new BanksOperations();
                var result = banksOperations.ReadAllData().ToArray();

                return result;
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return Enumerable.Empty<Bank>();
            }
            
        }

       
        [HttpPost]
        public void Post([FromBody] Bank bank)
        {
            try
            {
                BanksOperations banksOperations = new BanksOperations();
                banksOperations.InsertData(bank);
            }
            catch (Exception exp)
            {
               _logger.LogError(exp.Message);
            }
            
        }
    }
}
