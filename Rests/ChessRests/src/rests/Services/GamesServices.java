package rests.Services;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;

import rests.Models.Games;


@Stateless
@LocalBean

public class GamesServices {

	@PersistenceContext(type=PersistenceContextType.EXTENDED)
    private EntityManager em;
	
	public Games getById(int id){
		return em.find(Games.class, id);
	}
	
	@SuppressWarnings("unchecked")
	public List<Games> getByUserId(int id){
  	  Query query = em.createQuery("SELECT g FROM Games g WHERE g.userId = :id");
  	  query.setParameter("id", id);
  	  try{
  		List<Games> result = query.getResultList();
  		  return result;
  	  }
  	  catch(NoResultException e){
  		  return null;
  	  }
  }
	@SuppressWarnings("unchecked")
	public List<Games> getByOpponentId(int id){
  	  Query query = em.createQuery("SELECT g FROM Games g WHERE g.opponents_id = :id");
  	  query.setParameter("id", id);
  	  try{
  		List<Games> result = query.getResultList();
  		  return result;
  	  }
  	  catch(NoResultException e){
  		  return null;
  	  }
  }
}
