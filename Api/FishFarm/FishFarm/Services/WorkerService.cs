using System;
using System.Linq;
using System.Threading.Tasks;
using FishFarm.Controllers.DataTransferObjects;
using FishFarm.IServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace FishFarm.Services
{
    public class WorkerService : IWorkerService
    {
        private readonly fishfarmContext _db;

        public WorkerService(fishfarmContext db)
        {
            _db = db;
        }

        public async Task CreateWorker(WorkerCreateDto workerCreateDto)
        {
            var fishFarm = await _db.FishFarms.AsNoTracking()
                .Where(x => x.Id == workerCreateDto.FishFarmId)
                .FirstOrDefaultAsync();

            if (fishFarm == null)
            {
                throw new Exception("Fish farm with id:" + workerCreateDto.FishFarmId + " does not exist");
            }
            
            var worker = new User
            {
                Id = Guid.NewGuid(),
                Name = workerCreateDto.Name,
                Picture = workerCreateDto.Picture,
                Age = workerCreateDto.Age,
                Email = workerCreateDto.Email,
                Position = workerCreateDto.Position,
                CertifiedUntil = workerCreateDto.CertifiedUntil,
                FishFarmId = workerCreateDto.FishFarmId
            };
            
            await _db.Users.AddAsync(worker);
            await _db.SaveChangesAsync();
        }
    }
}