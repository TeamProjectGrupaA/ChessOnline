package rests.Resources;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import rests.Models.Games;
import rests.Services.GamesServices;

@Path("/games")
@Stateless
@LocalBean
@Produces(MediaType.APPLICATION_JSON)
public class GamesResources {

	@EJB
	private GamesServices gamesServices;
	
	@GET
	@Path("/{id}")
	public Games getById(@PathParam("id") int id){
		return gamesServices.getById(id);
	}
	
	@GET
	@Path("/user/{id}")
	public List <Games> getByUserId(@PathParam("id") int id){
		return gamesServices.getByUserId(id);
	}
	
	@GET
	@Path("/opp/{id}")
	public List <Games> getByOpponentId(@PathParam("id") int id){
		return gamesServices.getByOpponentId(id);
	}
}
