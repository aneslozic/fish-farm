using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FishFarm.Controllers.DataTransferObjects;

namespace FishFarm.IServices
{
    public interface IFishFarmService
    {
        Task CreateFishFarm(FishFarmCreateDto fishFarmCreateDto);
        Task<List<FishFarmGetDto>> GetFishFarms();
        Task<FishFarmDto> GetFishFarm(Guid id);
    }
}