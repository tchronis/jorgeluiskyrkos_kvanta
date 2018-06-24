package com.jorgeluiskyrkos.kvanta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jorgeluiskyrkos.kvanta.domain.Action;
import com.jorgeluiskyrkos.kvanta.repository.ActionRepository;
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
 * REST controller for managing Action.
 */
@RestController
@RequestMapping("/api")
public class ActionResource {

    private final Logger log = LoggerFactory.getLogger(ActionResource.class);

    private static final String ENTITY_NAME = "action";

    private final ActionRepository actionRepository;

    public ActionResource(ActionRepository actionRepository) {
        this.actionRepository = actionRepository;
    }

    /**
     * POST  /actions : Create a new action.
     *
     * @param action the action to create
     * @return the ResponseEntity with status 201 (Created) and with body the new action, or with status 400 (Bad Request) if the action has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/actions")
    @Timed
    public ResponseEntity<Action> createAction(@Valid @RequestBody Action action) throws URISyntaxException {
        log.debug("REST request to save Action : {}", action);
        if (action.getId() != null) {
            throw new BadRequestAlertException("A new action cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Action result = actionRepository.save(action);
        return ResponseEntity.created(new URI("/api/actions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /actions : Updates an existing action.
     *
     * @param action the action to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated action,
     * or with status 400 (Bad Request) if the action is not valid,
     * or with status 500 (Internal Server Error) if the action couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/actions")
    @Timed
    public ResponseEntity<Action> updateAction(@Valid @RequestBody Action action) throws URISyntaxException {
        log.debug("REST request to update Action : {}", action);
        if (action.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Action result = actionRepository.save(action);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, action.getId().toString()))
            .body(result);
    }

    /**
     * GET  /actions : get all the actions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of actions in body
     */
    @GetMapping("/actions")
    @Timed
    public List<Action> getAllActions() {
        log.debug("REST request to get all Actions");
        return actionRepository.findAll();
    }

    /**
     * GET  /actions/:id : get the "id" action.
     *
     * @param id the id of the action to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the action, or with status 404 (Not Found)
     */
    @GetMapping("/actions/{id}")
    @Timed
    public ResponseEntity<Action> getAction(@PathVariable Long id) {
        log.debug("REST request to get Action : {}", id);
        Optional<Action> action = actionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(action);
    }

    /**
     * DELETE  /actions/:id : delete the "id" action.
     *
     * @param id the id of the action to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/actions/{id}")
    @Timed
    public ResponseEntity<Void> deleteAction(@PathVariable Long id) {
        log.debug("REST request to delete Action : {}", id);

        actionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
