package com.jorgeluiskyrkos.kvanta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A VerifiedAction.
 */
@Entity
@Table(name = "verified_action")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class VerifiedAction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "deposit_amount", nullable = false)
    private Double depositAmount;

    @NotNull
    @Column(name = "date_instant", nullable = false)
    private Instant dateInstant;

    @OneToOne
    @JoinColumn(unique = true)
    private Action action;

    @OneToOne
    @JoinColumn(unique = true)
    private Bank bank;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getDepositAmount() {
        return depositAmount;
    }

    public VerifiedAction depositAmount(Double depositAmount) {
        this.depositAmount = depositAmount;
        return this;
    }

    public void setDepositAmount(Double depositAmount) {
        this.depositAmount = depositAmount;
    }

    public Instant getDateInstant() {
        return dateInstant;
    }

    public VerifiedAction dateInstant(Instant dateInstant) {
        this.dateInstant = dateInstant;
        return this;
    }

    public void setDateInstant(Instant dateInstant) {
        this.dateInstant = dateInstant;
    }

    public Action getAction() {
        return action;
    }

    public VerifiedAction action(Action action) {
        this.action = action;
        return this;
    }

    public void setAction(Action action) {
        this.action = action;
    }

    public Bank getBank() {
        return bank;
    }

    public VerifiedAction bank(Bank bank) {
        this.bank = bank;
        return this;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        VerifiedAction verifiedAction = (VerifiedAction) o;
        if (verifiedAction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), verifiedAction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VerifiedAction{" +
            "id=" + getId() +
            ", depositAmount=" + getDepositAmount() +
            ", dateInstant='" + getDateInstant() + "'" +
            "}";
    }
}
