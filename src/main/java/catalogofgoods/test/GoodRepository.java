package catalogofgoods.test;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodRepository extends JpaRepository<Good,Integer> {
}
