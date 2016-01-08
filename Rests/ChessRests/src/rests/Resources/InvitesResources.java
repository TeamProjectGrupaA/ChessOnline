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

import rests.Models.Invites;
import rests.Services.InvitesServices;

@Path("/invites")
@Stateless
@LocalBean
@Produces(MediaType.APPLICATION_JSON)
public class InvitesResources {

    @EJB
    private  InvitesServices invitesServices;

    @GET
    @Path("/")
    public List<Invites> getAll(){
    	return invitesServices.getAll();
    }
	@GET
	@Path("/reciver/{id}")
	public List<Invites> getByReciverId(@PathParam("id") Integer id){
		return invitesServices.getInvitesByReciverId(id);
	}
	
	@GET
	@Path("/sender/{id}")
	public List<Invites> getInvitesBySenderId(@PathParam("id") Integer id){
		return invitesServices.getInvitesBySenderId(id);
	}

}