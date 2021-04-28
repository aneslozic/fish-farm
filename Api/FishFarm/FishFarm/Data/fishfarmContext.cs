using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace FishFarm
{
    public partial class fishfarmContext : DbContext
    {
        public fishfarmContext()
        {
        }

        public fishfarmContext(DbContextOptions<fishfarmContext> options)
            : base(options)
        {
        }

        public virtual DbSet<FishFarm> FishFarms { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Host=localhost;Database=fishfarm;Username=fishfarm;Password=fishfarm");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("uuid-ossp")
                .HasAnnotation("Relational:Collation", "en_US.utf8");

            modelBuilder.Entity<FishFarm>(entity =>
            {
                entity.ToTable("FishFarm");

                entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");

                entity.Property(e => e.Latitude).HasPrecision(4);

                entity.Property(e => e.Longitude).HasPrecision(4);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");

                entity.Property(e => e.CertifiedUntil).HasColumnType("timestamp with time zone");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Position)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.FishFarm)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.FishFarmId)
                    .HasConstraintName("User_FishFarmId_fkey");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
