using System;
using System.Threading.Tasks;
using FishFarm.Controllers.DataTransferObjects;
using FishFarm.IServices;
using Microsoft.AspNetCore.Mvc;

namespace FishFarm.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WorkerController : ControllerBase
    {
        private readonly IWorkerService _workerService;

        public WorkerController(IWorkerService workerService)
        {
            _workerService = workerService;
        }

        [HttpPost]
        public async Task<ActionResult> CreateWorker([FromBody] WorkerCreateDto workerCreateDto)
        {
            try
            {
                await _workerService.CreateWorker(workerCreateDto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}