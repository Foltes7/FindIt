using Common.Database.models;
using Context.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Context.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
    }

    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(DatabaseContext context) : base(context) { }
    }
}
