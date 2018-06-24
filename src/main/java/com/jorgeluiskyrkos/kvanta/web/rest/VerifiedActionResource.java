package com.jorgeluiskyrkos.kvanta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jorgeluiskyrkos.kvanta.domain.VerifiedAction;
import com.jorgeluiskyrkos.kvanta.repository.VerifiedActionRepository;
import com.jorgeluiskyrkos.kvanta.web.rest.errors.BadRequestAlertException;
import com.jorgeluiskyrkos.kvanta.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing VerifiedAction.
 */
@RestController
@RequestMapping("/api")
public class VerifiedActionResource {

    private final Logger log = LoggerFactory.getLogger(VerifiedActionResource.class);

    private static final String ENTITY_NAME = "verifiedAction";

    private final VerifiedActionRepository verifiedActionRepository;

    public VerifiedActionResource(VerifiedActionRepository verifiedActionRepository) {
        this.verifiedActionRepository = verifiedActionRepository;
    }

    /**
     * POST  /verified-actions : Create a new verifiedAction.
     *
     * @param verifiedAction the verifiedAction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new verifiedAction, or with status 400 (Bad Request) if the verifiedAction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/verified-actions")
    @Timed
    public ResponseEntity<VerifiedAction> createVerifiedAction(@Valid @RequestBody VerifiedAction verifiedAction) throws URISyntaxException {
        log.debug("REST request to save VerifiedAction : {}", verifiedAction);
        if (verifiedAction.getId() != null) {
            throw new BadRequestAlertException("A new verifiedAction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VerifiedAction result = verifiedActionRepository.save(verifiedAction);
        return ResponseEntity.created(new URI("/api/verified-actions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /verified-actions : Updates an existing verifiedAction.
     *
     * @param verifiedAction the verifiedAction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated verifiedAction,
     * or with status 400 (Bad Request) if the verifiedAction is not valid,
     * or with status 500 (Internal Server Error) if the verifiedAction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/verified-actions")
    @Timed
    public ResponseEntity<VerifiedAction> updateVerifiedAction(@Valid @RequestBody VerifiedAction verifiedAction) throws URISyntaxException {
        log.debug("REST request to update VerifiedAction : {}", verifiedAction);
        if (verifiedAction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VerifiedAction result = verifiedActionRepository.save(verifiedAction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, verifiedAction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /verified-actions : get all the verifiedActions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of verifiedActions in body
     */
    @GetMapping("/verified-actions")
    @Timed
    public List<VerifiedAction> getAllVerifiedActions() {
        log.debug("REST request to get all VerifiedActions");
        return verifiedActionRepository.findAll();
    }

    /**
     * GET  /verified-actions/:id : get the "id" verifiedAction.
     *
     * @param id the id of the verifiedAction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the verifiedAction, or with status 404 (Not Found)
     */
    @GetMapping("/verified-actions/{id}")
    @Timed
    public ResponseEntity<VerifiedAction> getVerifiedAction(@PathVariable Long id) {
        log.debug("REST request to get VerifiedAction : {}", id);
        Optional<VerifiedAction> verifiedAction = verifiedActionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(verifiedAction);
    }

    /**
     * DELETE  /verified-actions/:id : delete the "id" verifiedAction.
     *
     * @param id the id of the verifiedAction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/verified-actions/{id}")
    @Timed
    public ResponseEntity<Void> deleteVerifiedAction(@PathVariable Long id) {
        log.debug("REST request to delete VerifiedAction : {}", id);

        verifiedActionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
