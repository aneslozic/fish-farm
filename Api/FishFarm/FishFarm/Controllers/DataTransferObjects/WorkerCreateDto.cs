using System;

namespace FishFarm.Controllers.DataTransferObjects
{
    public class WorkerCreateDto
    {
        public string Name { get; set; }
        public string Picture { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string Position { get; set; }
        public DateTime CertifiedUntil { get; set; }
        public Guid FishFarmId { get; set; }
    }
}