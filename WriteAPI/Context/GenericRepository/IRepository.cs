using Common.Database.helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Context.GenericRepository
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<T> GetById(int id);
        Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate);

        Task Add(T entity);
        Task Update(T entity);
        Task Remove(T entity);

        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate);
    }
}
