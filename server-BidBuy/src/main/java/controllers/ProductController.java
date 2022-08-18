package controllers;

import dtos.ProductDto;
import dtos.UserDto;
import model.Product;
import org.springframework.web.bind.annotation.*;
import services.ProductService;
import services.UserService;
import utils.NumberUtils;
import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*")
public class ProductController {
    private final ProductService productService;
    private final UserService userService;
    public ProductController(ProductService productService, UserService userService){
        this.productService = productService;
        this.userService = userService;
    }
    @GetMapping("/")
    public List<ProductDto> getAll(
            @RequestParam(name = "page",required = false) String page,
            @RequestParam(name = "view",required = false) String viewPerPage
    ){
        int pageNo = NumberUtils.stringToNumOrNeg(page);
        int view = NumberUtils.stringToNumOrNeg(viewPerPage);
        return this.productService
                    .getAll(
                        Math.max(pageNo, 1),
                        Math.max(view, 10)
                    );
    }
    @GetMapping ("/count")
    public Integer getAllCount(){return this.productService.getAllCount();}

    @GetMapping ("/{id}")
    public ProductDto getById(@PathVariable(name = "id",required = true) int id){
        return this.productService.getById(id);
    }
    @GetMapping ("/getByIdUser")
    public UserDto getByIdUser(@RequestParam(name = "id",required = true) int id){
        return this.productService.getById(id).getUser();
    }
    @GetMapping ("/getByName")
    public Product getByName(@RequestParam(name = "name",required = true) String name){
        return this.productService.getByName(name);
    }
    @RequestMapping("/delete")
    public void delete(@RequestParam(name = "id",required = true) int id){
        this.productService.delete(id);
    }
    @RequestMapping("/update")
    public void update(@RequestParam(name = "id",required = true) int id,@RequestParam(name = "product",required = true) Product product){
        this.productService.update(product);
    }
    @RequestMapping("/create")
    public void create(@RequestParam(name = "product",required = true) Product product){
        this.productService.save(product);
    }
    @GetMapping("/getProductByUserName/{username}")
    public List<ProductDto> getProductByUserName(@RequestParam(name = "page",required = false) String page,
                                                  @RequestParam(name = "view",required = false) String viewPerPage,
                                                  @PathVariable(name = "username",required = true) String username){
        int id= this.userService.getIdByUsername(username);
        int pageNo = NumberUtils.stringToNumOrNeg(page);
        int view = NumberUtils.stringToNumOrNeg(viewPerPage);
        return this.productService.getProductBySellerId(
                Math.max(pageNo, 1),
                Math.max(view, 10),
                id
        );
    }

}
