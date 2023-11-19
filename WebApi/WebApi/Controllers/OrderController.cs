using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using WebApi;

[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase
{
    private readonly Context _context;

    public OrderController(Context context)
    {
        _context = context;
    }

    // Get All Orders
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
    {
        var orders = await _context.ServiceOrders.ToListAsync();

        if (orders == null || orders.Count == 0)
        {
            return NotFound();
        }

        return orders;
    }


    // POST: api/Order
    [HttpPost]
    public async Task<ActionResult<Order>> PostOrder(Order order)
    {
        // Initialize default values if necessary
        order.CreateDate = DateTime.UtcNow; // Set the creation date to the current time
        order.Status = "Offen"; // You can set a default status or use the one provided in the request

        _context.ServiceOrders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAllOrders), new { id = order.OrderID }, order);
    }


    // Weitere Methoden für PUT, DELETE usw.
}
