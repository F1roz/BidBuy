package controllers;


import dtos.KycDto;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import services.KycService;
import utils.NumberUtils;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/kyc")
public class KycController {

    private final KycService kycService;

    public KycController(KycService kycService) {
        this.kycService = kycService;
    }

    @GetMapping(name = "/")
    public List<KycDto> getAll(
            @RequestParam(name = "page", required = false) String page,
            @RequestParam(name = "view", required = false) String viewPerPage
    ) {
        int pageNo = NumberUtils.stringToNumOrNeg(page);
        int view = NumberUtils.stringToNumOrNeg(viewPerPage);
        return this
                .kycService
                .getAll(
                        Math.max(pageNo, 1),
                        Math.max(view, 10)
                ).stream().map(KycDto::fromDbWithRelations).collect(Collectors.toList());
    }

    @GetMapping(value = "count", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Integer getAllCount() {
        return this.kycService.getAllCount();
    }
}
