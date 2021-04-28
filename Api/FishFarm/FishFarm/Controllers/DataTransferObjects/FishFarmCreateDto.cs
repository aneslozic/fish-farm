using System;
using System.Security.Cryptography;
using Microsoft.VisualBasic.CompilerServices;

namespace FishFarm.Controllers.DataTransferObjects
{
    public class FishFarmCreateDto
    {
        public string Name { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public int? NumberOfCages { get; set; }
        public string? Picture { get; set; }
        public bool Barge { get; set; }
    }
}