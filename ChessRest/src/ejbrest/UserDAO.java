package ejbrest;

import java.util.List;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;


@Stateless
@LocalBean

public class UserDAO {

	@PersistenceContext
    private EntityManager em;
    
    public User getUser(int id) {
        return em.find(User.class, id);
    }
    
    @SuppressWarnings("unchecked")
	public List<User> getAll(){
    	
    	  Query query = em.createQuery("SELECT u FROM User u");
    	  List<User> results = query.getResultList();
    	  return results;
    }
    
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void addUser(List<User> users) {
        for (User user : users) {
            em.persist(user);
        }
    }
    
}
