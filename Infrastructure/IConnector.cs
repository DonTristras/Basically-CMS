using LiteDB;

namespace Basically.Infrastructure
{
    public interface IConnector
    {
        void Create<T>(T Model);
        void Delete<T>(int id);
        LiteCollection<T> List<T>();
        void Update<T>(T Model);
        T GetByID<T>(int id);
    }
}