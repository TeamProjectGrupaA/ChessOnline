package rests.Resources;

import java.util.List;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import rests.Models.User;
import rests.Services.UserServices;

@Path("/users")
@Stateless
@LocalBean
@Produces(MediaType.APPLICATION_JSON)
public class UserResources {

    @EJB
    private UserServices userServices;

    @GET
    @Path("/")
    public List<User> getAll(){
    	return userServices.getAll();
    }
    
    @GET
    @Path("/{id}")
    public User getUser(@PathParam("id") int id) {
        return userServices.getUser(id);
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addUser(User user) {
    	userServices.addUser(user);
    }
    
    @GET
    @Path("/login/{login}")
    public User getUserByLogin(@PathParam("login") String login){
    	return userServices.getUserByLogin(login);
    }
}