package rests.Services;

import java.util.List;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;
import rests.Models.User;


@Stateless
@LocalBean

public class UserServices {

	@PersistenceContext(type=PersistenceContextType.EXTENDED)
    private EntityManager em;
    
    public User getUser(int id) {
        return em.find(User.class, id);
    }
    
    @SuppressWarnings("unchecked")  
	public List<User> getAll(){
    	  Query query = em.createQuery("SELECT DISTINCT u FROM User u ORDER BY u.id");
    	  List<User> results = query.getResultList();
    	  return results;
    }
    
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void addUser(User user) {
            em.persist(user);
    }
    
    public User getUserByLogin(String login){
    	Query query = em.createQuery("SELECT DISTINCT u FROM User u WHERE u.login = :name");
    	query.setParameter("name", login);
    	try{
    		User result = (User) query.getSingleResult();
    		return result;
    	}
    	catch(NoResultException e){
    		return null;
    	}
    	
    }
    
}