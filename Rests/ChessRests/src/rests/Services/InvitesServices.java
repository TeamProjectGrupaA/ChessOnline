package rests.Services;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;

import rests.Models.Invites;

@Stateless
@LocalBean
public class InvitesServices {

	@PersistenceContext(type=PersistenceContextType.EXTENDED)
    private EntityManager em;
	
    @SuppressWarnings("unchecked")  
	public List<Invites> getAll(){
    	  Query query = em.createQuery("SELECT i FROM Invites i ORDER BY i.id");
    	  List<Invites> results = query.getResultList();
    	  return results;
    }
	
	@SuppressWarnings("unchecked")
	public List<Invites> getInvitesByReciverId (Integer id) {
		Query query = em.createQuery("SELECT i FROM Invites i WHERE i.reciverId = :id");
		query.setParameter("id", id);
		try{
			List<Invites> results = query.getResultList();
			return results;
		}
		catch(NoResultException e){
			e.printStackTrace();
			return null;
		}
	}
	@SuppressWarnings("unchecked")
	public List<Invites> getInvitesBySenderId (Integer id) {
		Query query = em.createQuery("SELECT i FROM Invites i WHERE i.senderId = :id");
		query.setParameter("id", id);
		try{
			List<Invites> results = query.getResultList();
			return results;
		}
		catch(NoResultException e){
			e.printStackTrace();
			return null;
		}
	}
}