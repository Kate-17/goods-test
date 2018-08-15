package catalogofgoods.test;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("goods")
public class GoodController {
    private final GoodRepository goodRepository;

    @Autowired
    public GoodController(GoodRepository goodRepository) {
        this.goodRepository = goodRepository;
    }

    @GetMapping
    public List<Good> list() {
        return goodRepository.findAll();
    }

    @GetMapping("{id}")
    public Good getGood(@PathVariable("id") Good good) {
        return good;
    }

    @PostMapping
    public Good create(@RequestBody Good good) {
        return goodRepository.save(good);
    }

    @PutMapping("{id}")
    public Good update(
            @PathVariable("id") Good goodFromDataBase,
            @RequestBody Good good
    ) {
        BeanUtils.copyProperties(good, goodFromDataBase, "id");
        return goodRepository.save(goodFromDataBase);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Good good) {
        goodRepository.delete(good);
    }
}