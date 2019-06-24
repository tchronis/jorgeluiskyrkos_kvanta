package com.jorgeluiskyrkos.kvanta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Action.
 */
@Entity
@Table(name = "action")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Action implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @Lob
    @Column(name = "deposit_receipt")
    private byte[] depositReceipt;

    @Column(name = "deposit_receipt_content_type")
    private String depositReceiptContentType;

    @Column(name = "message_text")
    private String messageText;

    @Column(name = "visible")
    private Boolean visible;

    @Column(name = "verified")
    private Boolean verified;

    @Column(name = "amount")
    private Double amount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Action name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public Action email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public Action address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public byte[] getDepositReceipt() {
        return depositReceipt;
    }

    public Action depositReceipt(byte[] depositReceipt) {
        this.depositReceipt = depositReceipt;
        return this;
    }

    public void setDepositReceipt(byte[] depositReceipt) {
        this.depositReceipt = depositReceipt;
    }

    public String getDepositReceiptContentType() {
        return depositReceiptContentType;
    }

    public Action depositReceiptContentType(String depositReceiptContentType) {
        this.depositReceiptContentType = depositReceiptContentType;
        return this;
    }

    public void setDepositReceiptContentType(String depositReceiptContentType) {
        this.depositReceiptContentType = depositReceiptContentType;
    }

    public String getMessageText() {
        return messageText;
    }

    public Action messageText(String messageText) {
        this.messageText = messageText;
        return this;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public Boolean isVisible() {
        return visible;
    }

    public Action visible(Boolean visible) {
        this.visible = visible;
        return this;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Boolean isVerified() {
        return verified;
    }

    public Action verified(Boolean verified) {
        this.verified = verified;
        return this;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public Double getAmount() {
        return amount;
    }

    public Action amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
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
        Action action = (Action) o;
        if (action.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), action.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Action{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", address='" + getAddress() + "'" +
            ", depositReceipt='" + getDepositReceipt() + "'" +
            ", depositReceiptContentType='" + getDepositReceiptContentType() + "'" +
            ", messageText='" + getMessageText() + "'" +
            ", visible='" + isVisible() + "'" +
            ", verified='" + isVerified() + "'" +
            ", amount=" + getAmount() +
            "}";
    }
}
