package com.jorgeluiskyrkos.kvanta.web.rest;

import com.jorgeluiskyrkos.kvanta.JorgeluiskyrkosApp;

import com.jorgeluiskyrkos.kvanta.domain.Bank;
import com.jorgeluiskyrkos.kvanta.repository.BankRepository;
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
import java.util.List;


import static com.jorgeluiskyrkos.kvanta.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BankResource REST controller.
 *
 * @see BankResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JorgeluiskyrkosApp.class)
public class BankResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT = "BBBBBBBBBB";

    private static final String DEFAULT_IBAN = "AAAAAAAAAA";
    private static final String UPDATED_IBAN = "BBBBBBBBBB";

    @Autowired
    private BankRepository bankRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBankMockMvc;

    private Bank bank;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BankResource bankResource = new BankResource(bankRepository);
        this.restBankMockMvc = MockMvcBuilders.standaloneSetup(bankResource)
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
    public static Bank createEntity(EntityManager em) {
        Bank bank = new Bank()
            .name(DEFAULT_NAME)
            .account(DEFAULT_ACCOUNT)
            .iban(DEFAULT_IBAN);
        return bank;
    }

    @Before
    public void initTest() {
        bank = createEntity(em);
    }

    @Test
    @Transactional
    public void createBank() throws Exception {
        int databaseSizeBeforeCreate = bankRepository.findAll().size();

        // Create the Bank
        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bank)))
            .andExpect(status().isCreated());

        // Validate the Bank in the database
        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeCreate + 1);
        Bank testBank = bankList.get(bankList.size() - 1);
        assertThat(testBank.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBank.getAccount()).isEqualTo(DEFAULT_ACCOUNT);
        assertThat(testBank.getIban()).isEqualTo(DEFAULT_IBAN);
    }

    @Test
    @Transactional
    public void createBankWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bankRepository.findAll().size();

        // Create the Bank with an existing ID
        bank.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bank)))
            .andExpect(status().isBadRequest());

        // Validate the Bank in the database
        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankRepository.findAll().size();
        // set the field null
        bank.setName(null);

        // Create the Bank, which fails.

        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bank)))
            .andExpect(status().isBadRequest());

        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAccountIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankRepository.findAll().size();
        // set the field null
        bank.setAccount(null);

        // Create the Bank, which fails.

        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bank)))
            .andExpect(status().isBadRequest());

        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIbanIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankRepository.findAll().size();
        // set the field null
        bank.setIban(null);

        // Create the Bank, which fails.

        restBankMockMvc.perform(post("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bank)))
            .andExpect(status().isBadRequest());

        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBanks() throws Exception {
        // Initialize the database
        bankRepository.saveAndFlush(bank);

        // Get all the bankList
        restBankMockMvc.perform(get("/api/banks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bank.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].account").value(hasItem(DEFAULT_ACCOUNT.toString())))
            .andExpect(jsonPath("$.[*].iban").value(hasItem(DEFAULT_IBAN.toString())));
    }
    

    @Test
    @Transactional
    public void getBank() throws Exception {
        // Initialize the database
        bankRepository.saveAndFlush(bank);

        // Get the bank
        restBankMockMvc.perform(get("/api/banks/{id}", bank.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bank.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.account").value(DEFAULT_ACCOUNT.toString()))
            .andExpect(jsonPath("$.iban").value(DEFAULT_IBAN.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBank() throws Exception {
        // Get the bank
        restBankMockMvc.perform(get("/api/banks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBank() throws Exception {
        // Initialize the database
        bankRepository.saveAndFlush(bank);

        int databaseSizeBeforeUpdate = bankRepository.findAll().size();

        // Update the bank
        Bank updatedBank = bankRepository.findById(bank.getId()).get();
        // Disconnect from session so that the updates on updatedBank are not directly saved in db
        em.detach(updatedBank);
        updatedBank
            .name(UPDATED_NAME)
            .account(UPDATED_ACCOUNT)
            .iban(UPDATED_IBAN);

        restBankMockMvc.perform(put("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBank)))
            .andExpect(status().isOk());

        // Validate the Bank in the database
        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeUpdate);
        Bank testBank = bankList.get(bankList.size() - 1);
        assertThat(testBank.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBank.getAccount()).isEqualTo(UPDATED_ACCOUNT);
        assertThat(testBank.getIban()).isEqualTo(UPDATED_IBAN);
    }

    @Test
    @Transactional
    public void updateNonExistingBank() throws Exception {
        int databaseSizeBeforeUpdate = bankRepository.findAll().size();

        // Create the Bank

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBankMockMvc.perform(put("/api/banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bank)))
            .andExpect(status().isBadRequest());

        // Validate the Bank in the database
        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBank() throws Exception {
        // Initialize the database
        bankRepository.saveAndFlush(bank);

        int databaseSizeBeforeDelete = bankRepository.findAll().size();

        // Get the bank
        restBankMockMvc.perform(delete("/api/banks/{id}", bank.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Bank> bankList = bankRepository.findAll();
        assertThat(bankList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bank.class);
        Bank bank1 = new Bank();
        bank1.setId(1L);
        Bank bank2 = new Bank();
        bank2.setId(bank1.getId());
        assertThat(bank1).isEqualTo(bank2);
        bank2.setId(2L);
        assertThat(bank1).isNotEqualTo(bank2);
        bank1.setId(null);
        assertThat(bank1).isNotEqualTo(bank2);
    }
}
