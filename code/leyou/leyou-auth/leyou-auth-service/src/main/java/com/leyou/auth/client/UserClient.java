package com.leyou.auth.client;

import com.leyou.user.api.UserApi;
import com.leyou.user.pojo.User;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient("user-service")
public interface UserClient extends UserApi {

}
