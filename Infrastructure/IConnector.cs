using LiteDB;

namespace Basically.Infrastructure
{
    public interface IConnector
    {
        void Create<T>(T Model);
        void Delete<T>(int id);
        void DeleteReferences(int id, string referencedType, string targetType);
        LiteCollection<T> List<T>();
        void Update<T>(T Model);
    }
}