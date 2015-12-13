package ejbrest;

import java.util.List;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/users")
@Stateless
@LocalBean
@Produces(MediaType.APPLICATION_JSON)
public class UserWs {

    @EJB
    private UserDAO userDao;

    @GET
    @Path("/")
    public List<User> getAll(){
    	return userDao.getAll();
    }
    
    @GET
    @Path("/{id}")
    public User getUser(@PathParam("id") int id) {
        return userDao.getUser(id);
    }
    
    @POST
    public void addUser(List<User> users) {
        userDao.addUser(users);
    }
    
}
