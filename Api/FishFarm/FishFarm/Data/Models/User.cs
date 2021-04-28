using System;
using System.Collections.Generic;

#nullable disable

namespace FishFarm
{
    public partial class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string Position { get; set; }
        public DateTime? CertifiedUntil { get; set; }
        public Guid FishFarmId { get; set; }

        public virtual FishFarm FishFarm { get; set; }
    }
}
