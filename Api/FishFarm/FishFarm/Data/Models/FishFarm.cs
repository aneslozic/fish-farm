using System;
using System.Collections.Generic;

#nullable disable

namespace FishFarm
{
    public partial class FishFarm
    {
        public FishFarm()
        {
            Users = new HashSet<User>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public int? NumberOfCages { get; set; }
        public string Picture { get; set; }
        public bool Barge { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
