using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FishFarm.Controllers.DataTransferObjects;
using FishFarm.IServices;
using FishFarm.Util;
using Microsoft.EntityFrameworkCore;

namespace FishFarm.Services
{
    public class FishFarmService : IFishFarmService
    {
        private readonly fishfarmContext _db;

        public FishFarmService(fishfarmContext db)
        {
            _db = db;
        }

        public async Task CreateFishFarm(FishFarmCreateDto fishFarmCreateDto)
        {
            var fishFarm = new FishFarm
            {
                Id = Guid.NewGuid(),
                Name = fishFarmCreateDto.Name,
                Latitude = fishFarmCreateDto.Latitude,
                Longitude = fishFarmCreateDto.Longitude,
                NumberOfCages = fishFarmCreateDto.NumberOfCages,
                Picture = fishFarmCreateDto.Picture,
                Barge = fishFarmCreateDto.Barge
            };

            await _db.FishFarms.AddAsync(fishFarm);
            await _db.SaveChangesAsync();
        }

        public async Task<List<FishFarmGetDto>> GetFishFarms()
        {
            var fishFarms = await _db.FishFarms.AsNoTracking()
                .Select(x => new FishFarmGetDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Latitude = x.Latitude,
                    Longitude = x.Longitude,
                    NumberOfCages = x.NumberOfCages,
                    Picture = x.Picture,
                    Barge = x.Barge
                    
                }).ToListAsync();

            return fishFarms;
        }

        public async Task<FishFarmDto> GetFishFarm(Guid id)
        {
            var fishFarm = await _db.FishFarms
                .Include(x => x.Users)
                .Where(x => x.Id == id)
                .Select(x => new FishFarmDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Latitude = x.Latitude,
                    Longitude = x.Longitude,
                    NumberOfCages = x.NumberOfCages,
                    Picture = x.Picture,
                    Barge = x.Barge,
                    Workers = x.Users
                        .Where(y => y.FishFarmId == id)
                        .Select(y => new WorkerSummaryDto
                        {
                            Id = y.Id,
                            Name = y.Name,
                            Picture = y.Picture,
                            Age = y.Age,
                            Email = y.Email,
                            Position = y.Position,
                            CertifiedUntil = DateHelper.DateTimeUtcToUnixTime(y.CertifiedUntil)
                        }).ToList()
                }).FirstOrDefaultAsync();
            
            if (fishFarm == null)
            {
                throw new Exception("Fish farm with provided Id does not exist!");
            }

            return fishFarm;
        }
    }
}