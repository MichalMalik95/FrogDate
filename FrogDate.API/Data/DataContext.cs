using Microsoft.EntityFrameworkCore;
using FrogDate.API.Models;

namespace FrogDate.API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext>options):base(options)  {}
        public DbSet<Value> Values { get; set; }
    }
}