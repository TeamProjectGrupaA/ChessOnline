package rests.Models;



import java.io.Serializable;

import javax.persistence.*;






@Entity
@Table(name = "invites")
public class Invites implements Serializable {

	private static final long serialVersionUID = 1L;
	private int id;
    private Long creationTime;
    private Long removeTime;
    private Integer reciverId;
    private Integer senderId;
    private Boolean playable;
    private Integer gameId;
    private Long creationtime;
    private Long removetime;
    

    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = true)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "creationTime", nullable = true, insertable = true, updatable = true)
    public Long getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Long creationTime) {
        this.creationTime = creationTime;
    }

    @Basic
    @Column(name = "removeTime", nullable = true, insertable = true, updatable = true)
    public Long getRemoveTime() {
        return removeTime;
    }

    public void setRemoveTime(Long removeTime) {
        this.removeTime = removeTime;
    }

    @Basic
    @Column(name = "reciver_id", nullable = true, insertable = true, updatable = true)
    public Integer getReciverId() {
        return reciverId;
    }

    public void setReciverId(Integer reciverId) {
        this.reciverId = reciverId;
    }

    @Basic
    @Column(name = "sender_id", nullable = true, insertable = true, updatable = true)
    public Integer getSenderId() {
        return senderId;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    @Basic
    @Column(name = "playable", nullable = true, insertable = true, updatable = true)
    public Boolean getPlayable() {
        return playable;
    }

    public void setPlayable(Boolean playable) {
        this.playable = playable;
    }

    @Basic
    @Column(name = "game_id", nullable = true, insertable = true, updatable = true)
    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Invites invites = (Invites) o;

        if (id != invites.id) return false;
        if (creationTime != null ? !creationTime.equals(invites.creationTime) : invites.creationTime != null)
            return false;
        if (gameId != null ? !gameId.equals(invites.gameId) : invites.gameId != null) return false;
        if (playable != null ? !playable.equals(invites.playable) : invites.playable != null) return false;
        if (reciverId != null ? !reciverId.equals(invites.reciverId) : invites.reciverId != null) return false;
        if (removeTime != null ? !removeTime.equals(invites.removeTime) : invites.removeTime != null) return false;
        if (senderId != null ? !senderId.equals(invites.senderId) : invites.senderId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (creationTime != null ? creationTime.hashCode() : 0);
        result = 31 * result + (removeTime != null ? removeTime.hashCode() : 0);
        result = 31 * result + (reciverId != null ? reciverId.hashCode() : 0);
        result = 31 * result + (senderId != null ? senderId.hashCode() : 0);
        result = 31 * result + (playable != null ? playable.hashCode() : 0);
        result = 31 * result + (gameId != null ? gameId.hashCode() : 0);
        return result;
    }
    public Invites(){}

    @Basic
    @Column(name = "creationtime", nullable = true, insertable = true, updatable = true)
    public Long getCreationtime() {
        return creationtime;
    }

    public void setCreationtime(Long creationtime) {
        this.creationtime = creationtime;
    }

    @Basic
    @Column(name = "removetime", nullable = true, insertable = true, updatable = true)
    public Long getRemovetime() {
        return removetime;
    }

    public void setRemovetime(Long removetime) {
        this.removetime = removetime;
    }
	}