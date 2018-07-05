package com.jorgeluiskyrkos.kvanta.web.rest;

import com.jorgeluiskyrkos.kvanta.JorgeluiskyrkosApp;

import com.jorgeluiskyrkos.kvanta.domain.VerifiedAction;
import com.jorgeluiskyrkos.kvanta.repository.VerifiedActionRepository;
import com.jorgeluiskyrkos.kvanta.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.jorgeluiskyrkos.kvanta.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the VerifiedActionResource REST controller.
 *
 * @see VerifiedActionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JorgeluiskyrkosApp.class)
public class VerifiedActionResourceIntTest {

    private static final Double DEFAULT_DEPOSIT_AMOUNT = 1D;
    private static final Double UPDATED_DEPOSIT_AMOUNT = 2D;

    private static final Instant DEFAULT_DATE_INSTANT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_INSTANT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private VerifiedActionRepository verifiedActionRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVerifiedActionMockMvc;

    private VerifiedAction verifiedAction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VerifiedActionResource verifiedActionResource = new VerifiedActionResource(verifiedActionRepository);
        this.restVerifiedActionMockMvc = MockMvcBuilders.standaloneSetup(verifiedActionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VerifiedAction createEntity(EntityManager em) {
        VerifiedAction verifiedAction = new VerifiedAction()
            .depositAmount(DEFAULT_DEPOSIT_AMOUNT)
            .dateInstant(DEFAULT_DATE_INSTANT);
        return verifiedAction;
    }

    @Before
    public void initTest() {
        verifiedAction = createEntity(em);
    }

    @Test
    @Transactional
    public void createVerifiedAction() throws Exception {
        int databaseSizeBeforeCreate = verifiedActionRepository.findAll().size();

        // Create the VerifiedAction
        restVerifiedActionMockMvc.perform(post("/api/verified-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verifiedAction)))
            .andExpect(status().isCreated());

        // Validate the VerifiedAction in the database
        List<VerifiedAction> verifiedActionList = verifiedActionRepository.findAll();
        assertThat(verifiedActionList).hasSize(databaseSizeBeforeCreate + 1);
        VerifiedAction testVerifiedAction = verifiedActionList.get(verifiedActionList.size() - 1);
        assertThat(testVerifiedAction.getDepositAmount()).isEqualTo(DEFAULT_DEPOSIT_AMOUNT);
        assertThat(testVerifiedAction.getDateInstant()).isEqualTo(DEFAULT_DATE_INSTANT);
    }

    @Test
    @Transactional
    public void createVerifiedActionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = verifiedActionRepository.findAll().size();

        // Create the VerifiedAction with an existing ID
        verifiedAction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVerifiedActionMockMvc.perform(post("/api/verified-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verifiedAction)))
            .andExpect(status().isBadRequest());

        // Validate the VerifiedAction in the database
        List<VerifiedAction> verifiedActionList = verifiedActionRepository.findAll();
        assertThat(verifiedActionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDepositAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = verifiedActionRepository.findAll().size();
        // set the field null
        verifiedAction.setDepositAmount(null);

        // Create the VerifiedAction, which fails.

        restVerifiedActionMockMvc.perform(post("/api/verified-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verifiedAction)))
            .andExpect(status().isBadRequest());

        List<VerifiedAction> verifiedActionList = verifiedActionRepository.findAll();
        assertThat(verifiedActionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateInstantIsRequired() throws Exception {
        int databaseSizeBeforeTest = verifiedActionRepository.findAll().size();
        // set the field null
        verifiedAction.setDateInstant(null);

        // Create the VerifiedAction, which fails.

        restVerifiedActionMockMvc.perform(post("/api/verified-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verifiedAction)))
            .andExpect(status().isBadRequest());

        List<VerifiedAction> verifiedActionList = verifiedActionRepository.findAll();
        assertThat(verifiedActionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVerifiedActions() throws Exception {
        // Initialize the database
        verifiedActionRepository.saveAndFlush(verifiedAction);

        // Get all the verifiedActionList
        restVerifiedActionMockMvc.perform(get("/api/verified-actions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(verifiedAction.getId().intValue())))
            .andExpect(jsonPath("$.[*].depositAmount").value(hasItem(DEFAULT_DEPOSIT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].dateInstant").value(hasItem(DEFAULT_DATE_INSTANT.toString())));
    }
    

    @Test
    @Transactional
    public void getVerifiedAction() throws Exception {
        // Initialize the database
        verifiedActionRepository.saveAndFlush(verifiedAction);

        // Get the verifiedAction
        restVerifiedActionMockMvc.perform(get("/api/verified-actions/{id}", verifiedAction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(verifiedAction.getId().intValue()))
            .andExpect(jsonPath("$.depositAmount").value(DEFAULT_DEPOSIT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.dateInstant").value(DEFAULT_DATE_INSTANT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingVerifiedAction() throws Exception {
        // Get the verifiedAction
        restVerifiedActionMockMvc.perform(get("/api/verified-actions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVerifiedAction() throws Exception {
        // Initialize the database
        verifiedActionRepository.saveAndFlush(verifiedAction);

        int databaseSizeBeforeUpdate = verifiedActionRepository.findAll().size();

        // Update the verifiedAction
        VerifiedAction updatedVerifiedAction = verifiedActionRepository.findById(verifiedAction.getId()).get();
        // Disconnect from session so that the updates on updatedVerifiedAction are not directly saved in db
        em.detach(updatedVerifiedAction);
        updatedVerifiedAction
            .depositAmount(UPDATED_DEPOSIT_AMOUNT)
            .dateInstant(UPDATED_DATE_INSTANT);

        restVerifiedActionMockMvc.perform(put("/api/verified-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVerifiedAction)))
            .andExpect(status().isOk());

        // Validate the VerifiedAction in the database
        List<VerifiedAction> verifiedActionList = verifiedActionRepository.findAll();
        assertThat(verifiedActionList).hasSize(databaseSizeBeforeUpdate);
        VerifiedAction testVerifiedAction = verifiedActionList.get(verifiedActionList.size() - 1);
        assertThat(testVerifiedAction.getDepositAmount()).isEqualTo(UPDATED_DEPOSIT_AMOUNT);
        assertThat(testVerifiedAction.getDateInstant()).isEqualTo(UPDATED_DATE_INSTANT);
    }

    @Test
    @Transactional
    public void updateNonExistingVerifiedAction() throws Exception {
        int databaseSizeBeforeUpdate = verifiedActionRepository.findAll().size();

        // Create the VerifiedAction

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVerifiedActionMockMvc.perform(put("/api/verified-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verifiedAction)))
            .andExpect(status().isBadRequest());

        // Validate the VerifiedAction in the database
        List<VerifiedAction> verifiedActionList = verifiedActionRepository.findAll();
        assertThat(verifiedActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVerifiedAction() throws Exception {
        // Initialize the database
        verifiedActionRepository.saveAndFlush(verifiedAction);

        int databaseSizeBeforeDelete = verifiedActionRepository.findAll().size();

        // Get the verifiedAction
        restVerifiedActionMockMvc.perform(delete("/api/verified-actions/{id}", verifiedAction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VerifiedAction> verifiedActionList = verifiedActionRepository.findAll();
        assertThat(verifiedActionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VerifiedAction.class);
        VerifiedAction verifiedAction1 = new VerifiedAction();
        verifiedAction1.setId(1L);
        VerifiedAction verifiedAction2 = new VerifiedAction();
        verifiedAction2.setId(verifiedAction1.getId());
        assertThat(verifiedAction1).isEqualTo(verifiedAction2);
        verifiedAction2.setId(2L);
        assertThat(verifiedAction1).isNotEqualTo(verifiedAction2);
        verifiedAction1.setId(null);
        assertThat(verifiedAction1).isNotEqualTo(verifiedAction2);
    }
}
