using System;

namespace FishFarm.Controllers.DataTransferObjects
{
    public class WorkerSummaryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string Position { get; set; }
        public long? CertifiedUntil { get; set; }
    }
}