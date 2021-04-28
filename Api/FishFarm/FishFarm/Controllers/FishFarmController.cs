using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FishFarm.Controllers.DataTransferObjects;
using FishFarm.IServices;
using Microsoft.AspNetCore.Mvc;

namespace FishFarm.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FishFarmController : ControllerBase
    {
        private readonly IFishFarmService _fishFarmService;

        public FishFarmController (IFishFarmService fishFarmService)
        {
            _fishFarmService = fishFarmService;
        }
        
        [HttpPost]
        public async Task<ActionResult> CreateFishFarm([FromBody] FishFarmCreateDto dto)
        {
            try
            {
                await _fishFarmService.CreateFishFarm(dto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<FishFarmGetDto>>> GetFishFarms()
        {
            try
            {
                var fishFarms = await _fishFarmService.GetFishFarms();
                return fishFarms;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FishFarmDto>> GetFishFarm(Guid id)
        {
            try
            {
                var fishFarm = await _fishFarmService.GetFishFarm(id);
                return fishFarm;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}