using Microsoft.EntityFrameworkCore;
using WebApi;

public class Context : DbContext
{

    public Context(DbContextOptions<Context> options)
      : base(options)
    {
    }

    // Database sets für Entitys
    public DbSet<Order> ServiceOrders { get; set; }
    public DbSet<Employee> Employees { get; set; }

}