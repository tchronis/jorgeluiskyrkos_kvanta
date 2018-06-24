package com.jorgeluiskyrkos.kvanta.repository;

import com.jorgeluiskyrkos.kvanta.domain.VerifiedAction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VerifiedAction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VerifiedActionRepository extends JpaRepository<VerifiedAction, Long> {

}
