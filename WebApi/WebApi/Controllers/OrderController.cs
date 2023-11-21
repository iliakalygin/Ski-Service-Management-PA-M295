using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    // GET alles von api/Order
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
    {
        var orders = await _context.Orders.ToListAsync();

        if (orders == null || orders.Count == 0)
        {
            return NotFound();
        }
        return orders;
    }

    // POST nach api/Order
    [HttpPost]
    public async Task<ActionResult<Order>> PostOrder(Order order)
    {
        order.CreateDate = DateTime.UtcNow;

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAllOrders), new { id = order.OrderID }, order);
    }

    // PUT nach api/Order/id
    [HttpPut("{id}")]
    public IActionResult PutOrder(int id, Order Order)
    {
        if (id != Order.OrderID)
        {
            return BadRequest();
        }
        _context.Entry(Order).State = EntityState.Modified;
        try
        {
            _context.SaveChanges();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!OrderExists(id))
            {
                return NotFound();
            }
            else
                throw;
        }
        return NoContent();
    }

    private bool OrderExists(int id)
    {
        return _context.Orders.Any(e => e.OrderID == id);
    }

    // DELETE aus api/Order/id
    [HttpDelete("{id}")]
    public IActionResult DeleteSOrder(int id)
    {
        var Order = _context.Orders.Find(id);
        if (Order == null)
        {
            return NotFound();
        }
        _context.Orders.Remove(Order);
        _context.SaveChanges();
        return NoContent();
    }
}
