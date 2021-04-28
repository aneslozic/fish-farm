using System;

namespace FishFarm.Controllers.DataTransferObjects
{
    public class FishFarmGetDto
    {
        public Guid Id { get; set;  }
        public string Name { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public int? NumberOfCages { get; set; }
        public string? Picture { get; set; }
        public bool Barge { get; set; }
    }
}