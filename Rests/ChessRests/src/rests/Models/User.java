package rests.Models;




import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;




@Entity
@Table(name = "users")
public class User implements Serializable {

	private static final long serialVersionUID = 1L;
 
	 private int id;
	    private String firstname;
	    private String lastname;
	    private Long birthdate;
	    private String email;
	    private String login;
	    private String password;
	    private Integer wins;
	    private Integer losts;
	    private Integer points;
	    private Integer ties;
	    

	    @Id
	    @Column(name = "id", nullable = false, insertable = true, updatable = true)
	    public int getId() {
	        return id;
	    }

	    public void setId(int id) {
	        this.id = id;
	    }

	    @Basic
	    @Column(name = "firstname", nullable = true, insertable = true, updatable = true, length = 30)
	    public String getFirstname() {
	        return firstname;
	    }

	    public void setFirstname(String firstname) {
	        this.firstname = firstname;
	    }

	    @Basic
	    @Column(name = "lastname", nullable = true, insertable = true, updatable = true, length = 40)
	    public String getLastname() {
	        return lastname;
	    }

	    public void setLastname(String lastname) {
	        this.lastname = lastname;
	    }

	    @Basic
	    @Column(name = "birthdate", nullable = true, insertable = true, updatable = true)
	    public Long getBirthdate() {
	        return birthdate;
	    }

	    public void setBirthdate(Long birthdate) {
	        this.birthdate = birthdate;
	    }

	    @Basic
	    @Column(name = "email", nullable = true, insertable = true, updatable = true, length = 60)
	    public String getEmail() {
	        return email;
	    }

	    public void setEmail(String email) {
	        this.email = email;
	    }

	    @Basic
	    @Column(name = "login", nullable = true, insertable = true, updatable = true, length = 30)
	    public String getLogin() {
	        return login;
	    }

	    public void setLogin(String login) {
	        this.login = login;
	    }

	    @Basic
	    @Column(name = "password", nullable = true, insertable = true, updatable = true, length = 30)
	    public String getPassword() {
	        return password;
	    }

	    public void setPassword(String password) {
	        this.password = password;
	    }

	    @Basic
	    @Column(name = "wins", nullable = true, insertable = true, updatable = true)
	    public Integer getWins() {
	        return wins;
	    }

	    public void setWins(Integer wins) {
	        this.wins = wins;
	    }

	    @Basic
	    @Column(name = "losts", nullable = true, insertable = true, updatable = true)
	    public Integer getLosts() {
	        return losts;
	    }

	    public void setLosts(Integer losts) {
	        this.losts = losts;
	    }

	    @Basic
	    @Column(name = "points", nullable = true, insertable = true, updatable = true)
	    public Integer getPoints() {
	        return points;
	    }

	    public void setPoints(Integer points) {
	        this.points = points;
	    }

	    @Basic
	    @Column(name = "ties", nullable = true, insertable = true, updatable = true)
	    public Integer getTies() {
	        return ties;
	    }

	    public void setTies(Integer ties) {
	        this.ties = ties;
	    }

	    
	    public User(){}
	    
	    @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (o == null || getClass() != o.getClass()) return false;

	        User users = (User) o;

	        if (id != users.id) return false;
	        if (birthdate != null ? !birthdate.equals(users.birthdate) : users.birthdate != null) return false;
	        if (email != null ? !email.equals(users.email) : users.email != null) return false;
	        if (firstname != null ? !firstname.equals(users.firstname) : users.firstname != null) return false;
	        if (lastname != null ? !lastname.equals(users.lastname) : users.lastname != null) return false;
	        if (login != null ? !login.equals(users.login) : users.login != null) return false;
	        if (losts != null ? !losts.equals(users.losts) : users.losts != null) return false;
	        if (password != null ? !password.equals(users.password) : users.password != null) return false;
	        if (points != null ? !points.equals(users.points) : users.points != null) return false;
	        if (ties != null ? !ties.equals(users.ties) : users.ties != null) return false;
	        if (wins != null ? !wins.equals(users.wins) : users.wins != null) return false;

	        return true;
	    }

	    @Override
	    public int hashCode() {
	        int result = id;
	        result = 31 * result + (firstname != null ? firstname.hashCode() : 0);
	        result = 31 * result + (lastname != null ? lastname.hashCode() : 0);
	        result = 31 * result + (birthdate != null ? birthdate.hashCode() : 0);
	        result = 31 * result + (email != null ? email.hashCode() : 0);
	        result = 31 * result + (login != null ? login.hashCode() : 0);
	        result = 31 * result + (password != null ? password.hashCode() : 0);
	        result = 31 * result + (wins != null ? wins.hashCode() : 0);
	        result = 31 * result + (losts != null ? losts.hashCode() : 0);
	        result = 31 * result + (points != null ? points.hashCode() : 0);
	        result = 31 * result + (ties != null ? ties.hashCode() : 0);
	        return result;
	    }
}