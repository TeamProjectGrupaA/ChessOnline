package rests.Models;



import javax.persistence.*;


@Entity
@Table(name = "games")
public class Games {
 
	  private int id;
	    private String fen;
	    private Integer oponentId;
	    private Integer userId;

	    @Id
	    @Column(name = "id", nullable = false, insertable = true, updatable = true)
	    public int getId() {
	        return id;
	    }

	    public void setId(int id) {
	        this.id = id;
	    }

	    @Basic
	    @Column(name = "fen", nullable = true, insertable = true, updatable = true, length = 255)
	    public String getFen() {
	        return fen;
	    }

	    public void setFen(String fen) {
	        this.fen = fen;
	    }

	    @Basic
	    @Column(name = "oponent_id", nullable = true, insertable = true, updatable = true)
	    public Integer getOponentId() {
	        return oponentId;
	    }

	    public void setOponentId(Integer oponentId) {
	        this.oponentId = oponentId;
	    }

	    @Basic
	    @Column(name = "user_id", nullable = true, insertable = true, updatable = true)
	    public Integer getUserId() {
	        return userId;
	    }

	    public void setUserId(Integer userId) {
	        this.userId = userId;
	    }

	    @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (o == null || getClass() != o.getClass()) return false;

	        Games games = (Games) o;

	        if (id != games.id) return false;
	        if (fen != null ? !fen.equals(games.fen) : games.fen != null) return false;
	        if (oponentId != null ? !oponentId.equals(games.oponentId) : games.oponentId != null) return false;
	        if (userId != null ? !userId.equals(games.userId) : games.userId != null) return false;

	        return true;
	    }

	    @Override
	    public int hashCode() {
	        int result = id;
	        result = 31 * result + (fen != null ? fen.hashCode() : 0);
	        result = 31 * result + (oponentId != null ? oponentId.hashCode() : 0);
	        result = 31 * result + (userId != null ? userId.hashCode() : 0);
	        return result;
	    }
}