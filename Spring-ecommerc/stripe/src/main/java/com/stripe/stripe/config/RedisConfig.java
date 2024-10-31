package com.stripe.stripe.config;

import com.stripe.stripe.dto.RequestChargeDTO;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.data.redis.connection.RedisConnectionFactory;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, RequestChargeDTO> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, RequestChargeDTO> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new Jackson2JsonRedisSerializer<>(RequestChargeDTO.class));
        return template;
    }
}
